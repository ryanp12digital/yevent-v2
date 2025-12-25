
export interface Space {
  id: string;
  name: string;
  image: string;
  city: string;
  capacity: number;
  area: string;
  tags: string[];
  price?: number;
}

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Auditório Compacto Fortaleza',
    image: 'https://yevent.com.br/wp-content/uploads/2025/07/Auditorio-para-25-pessoas-v02.webp',
    city: 'Fortaleza',
    capacity: 25,
    area: '35m²',
    tags: ['Auditório', 'Corporativo', 'Fortaleza'],
  },
  {
    id: '2',
    name: 'Sala de Reunião Petit',
    image: 'https://yevent.com.br/wp-content/uploads/2025/07/Sala-de-Reuniao-5-Pessoas-V1.webp',
    city: 'Fortaleza',
    capacity: 5,
    area: '15m²',
    tags: ['Reunião', 'Privativo', 'Fortaleza'],
  },
  {
    id: '3',
    name: 'Auditório Hot Center',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/Empresarial-Hot-Center-AUDITORIO-1-01.webp',
    city: 'Fortaleza',
    capacity: 50,
    area: '60m²',
    tags: ['Palestras', 'Auditório', 'Fortaleza'],
  },
  {
    id: '4',
    name: 'Sala Executiva Hot Center',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/Empresarial-Hot-Center-SALA-DINAMICA-1-01.webp',
    city: 'Fortaleza',
    capacity: 38,
    area: '45m²',
    tags: ['Workshops', 'Sala de Aula', 'Fortaleza'],
  },
  {
    id: '5',
    name: 'Sala Office Pool I',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/Edf.-Salvador-Office-Pool-SALA-4-2-01.webp',
    city: 'Salvador',
    capacity: 40,
    area: '50m²',
    tags: ['Treinamentos', 'Corporativo', 'Salvador'],
  },
  {
    id: '6',
    name: 'Espaço Corporativo SSA',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/WhatsApp-Image-2025-04-09-at-19.05.28.webp',
    city: 'Salvador',
    capacity: 40,
    area: '50m²',
    tags: ['Eventos', 'Flexível', 'Salvador'],
  },
  {
    id: '7',
    name: 'Sala Office Pool II',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/Edf.-Salvador-Office-Pool-SALA-2-1-01.webp',
    city: 'Salvador',
    capacity: 25,
    area: '30m²',
    tags: ['Workshop', 'Reunião', 'Salvador'],
  },
  {
    id: '8',
    name: 'Grand Auditório Recife',
    image: 'https://yevent.com.br/wp-content/uploads/2024/07/Auditorio-para-ate-90-pessoas-02-V1.webp',
    city: 'Recife',
    capacity: 90,
    area: '120m²',
    tags: ['Conferência', 'Grande Porte', 'Recife'],
  }
];
