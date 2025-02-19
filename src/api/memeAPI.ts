import axios from 'axios'

const API_BASE_URL = 'https://api.imgflip.com'

export interface Meme {
  id: string
  name: string
  url: string
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

export async function createMeme(
  templateId: string,
  topText: string,
  bottomText: string,
): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/caption_image`, null, {
      params: {
        template_id: templateId,
        text0: topText,
        text1: bottomText,
        username: 'Junjies',
        password: 'cnm_nba.det@agt6KGK',
      },
    })

    if (!response.data.success) {
      throw new Error('Fout bij het genereren van de meme.')
    }

    return response.data.data.url
  } catch (error) {
    console.error('Fout bij het maken van een meme:', error)
    throw new Error('Kon de meme niet genereren.')
  }
}
