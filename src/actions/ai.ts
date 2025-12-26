'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateSEODescription(
    spaceName: string,
    city: string,
    capacity: number,
    amenities: string[]
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `Crie uma descrição otimizada para SEO em português para um espaço de eventos corporativos com as seguintes características:

Nome: ${spaceName}
Cidade: ${city}
Capacidade: ${capacity} pessoas
Comodidades: ${amenities.join(', ')}

A descrição deve:
- Ter entre 150-200 palavras
- Ser persuasiva e profissional
- Incluir palavras-chave relevantes para SEO (eventos corporativos, reuniões, treinamentos, workshops)
- Destacar os diferenciais do espaço
- Mencionar a localização estratégica
- Ser escrita em português do Brasil
- Não incluir preços ou informações de contato

Escreva apenas a descrição, sem títulos ou formatação adicional.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return text.trim()
    } catch (error) {
        console.error('Error generating AI description:', error)
        throw new Error('Falha ao gerar descrição com IA. Tente novamente.')
    }
}
