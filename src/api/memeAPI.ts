// memeAPI.ts
import axios from 'axios'

const API_BASE_URL = 'https://api.imgflip.com'

export interface Meme {
  id: string
  name: string
  url: string
  box_count: number // Toegevoegd zodat je weet hoeveel tekstvelden nodig zijn
}

export async function fetchMemes(): Promise<Meme[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_memes`)
    return response.data.data.memes
  } catch (error) {
    console.error('Fout bij het ophalen van memes:', error)
    throw new Error('Kon de memes niet ophalen.')
  }
}

export async function createMeme(templateId: string, texts: string[]): Promise<string> {
  try {
    const params: any = {
      template_id: templateId,
      username: 'Junjies',
      password: 'cnm_nba.det@agt6KGK',
    }

    // Voeg voor elk tekstveld de box parameter toe
    texts.forEach((text, index) => {
      params[`boxes[${index}][text]`] = text
    })

    const response = await axios.post(`${API_BASE_URL}/caption_image`, null, {
      params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: false,
    })

    if (!response.data.success) {
      throw new Error('Fout bij het genereren van de meme: ' + response.data.error_message)
    }

    return response.data.data.url
  } catch (error) {
    console.error('API-fout:', error)
    throw new Error('Kon de meme niet genereren.')
  }
}
