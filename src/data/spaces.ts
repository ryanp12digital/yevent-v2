
import { StaticImageData } from 'next/image';

// Fortaleza Images
import fortalezaAuditorio from '@/assets/Fortaleza/WEB/Empresarial Hot Center - AUDITÓRIO #1 - - 01.webp';
import fortalezaSala3 from '@/assets/Fortaleza/WEB/Empresarial Hot Center - SALA 3 #1 - - 01.webp';
import fortalezaSalaDinamica from '@/assets/Fortaleza/WEB/Empresarial Hot Center - SALA DINÂMICA #1 - - 01.webp';

// Salvador Images
import salvadorSala4 from '@/assets/Salvador/WEB/Edf. Salvador Office & Pool - SALA 4 #1 - - 01.webp';
import salvadorSala2 from '@/assets/Salvador/WEB/Edf. Salvador Office & Pool - SALA 2 #1 - - 01.webp';
import salvadorLaboratorio from '@/assets/Salvador/WEB/Edf. Salvador Office & Pool - LABORATÓRIO #1 - - 01.webp';

// Recife Images
import recifeAuditorio from '@/assets/Recife/WEB/Rua Manuel de Brito - AUDITÓRIO #1 - - 01.webp';
import recifeLaboratorio1 from '@/assets/Recife/WEB/Rua Manuel de Brito - LABORATÓRIO 1 - - 01.webp';
import recifeSala7 from '@/assets/Recife/WEB/Rua Manuel de Brito - SALA 7 #1 - - 01.webp';

export interface Space {
  id: string;
  name: string;
  image: string | string[] | StaticImageData;
  city: string;
  address: string; // Added address field
  capacity: number;
  area: string;
  tags: string[];
  price?: number;
  amenities: string[]; // Changed to required array of string keys
  rules?: string[];
}

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Auditório Compacto Fortaleza',
    image: fortalezaSala3,
    city: 'Fortaleza',
    address: 'Av. Júlio Abreu, 160 - Varjota, Fortaleza - CE, 60160-240',
    capacity: 25,
    area: '35m²',
    tags: ['Auditório', 'Corporativo', 'Fortaleza'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  },
  {
    id: '2',
    name: 'Sala de Reunião Petit',
    image: fortalezaSala3,
    city: 'Fortaleza',
    address: 'Av. Júlio Abreu, 160 - Varjota, Fortaleza - CE, 60160-240',
    capacity: 5,
    area: '15m²',
    tags: ['Reunião', 'Privativo', 'Fortaleza'],
    amenities: ['wifi', 'tv', 'water', 'coffee'],
  },
  {
    id: '3',
    name: 'Auditório Hot Center',
    image: fortalezaAuditorio,
    city: 'Fortaleza',
    address: 'Av. Júlio Abreu, 160 - Varjota, Fortaleza - CE, 60160-240',
    capacity: 50,
    area: '60m²',
    tags: ['Palestras', 'Auditório', 'Fortaleza'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  },
  {
    id: '4',
    name: 'Sala Executiva Hot Center',
    image: fortalezaSalaDinamica,
    city: 'Fortaleza',
    address: 'Av. Júlio Abreu, 160 - Varjota, Fortaleza - CE, 60160-240',
    capacity: 38,
    area: '45m²',
    tags: ['Workshops', 'Sala de Aula', 'Fortaleza'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  },
  {
    id: '5',
    name: 'Sala Office Pool I',
    image: salvadorSala4,
    city: 'Salvador',
    address: 'R. Alceu Amoroso Lima, 172 - Caminho das Árvores, Salvador - BA, 41820-020',
    capacity: 40,
    area: '50m²',
    tags: ['Treinamentos', 'Corporativo', 'Salvador'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  },
  {
    id: '6',
    name: 'Espaço Corporativo SSA',
    image: salvadorLaboratorio,
    city: 'Salvador',
    address: 'R. Alceu Amoroso Lima, 172 - Caminho das Árvores, Salvador - BA, 41820-020',
    capacity: 40,
    area: '50m²',
    tags: ['Eventos', 'Flexível', 'Salvador'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  },
  {
    id: '7',
    name: 'Sala Office Pool II',
    image: salvadorSala2,
    city: 'Salvador',
    address: 'R. Alceu Amoroso Lima, 172 - Caminho das Árvores, Salvador - BA, 41820-020',
    capacity: 25,
    area: '30m²',
    tags: ['Workshop', 'Reunião', 'Salvador'],
    amenities: ['wifi', 'tv', 'coffee', 'water'],
  },
  {
    id: '8',
    name: 'Grand Auditório Recife',
    image: recifeAuditorio,
    city: 'Recife',
    address: 'Rua Manuel de Brito, 311 - Pina, Recife - PE',
    capacity: 90,
    area: '120m²',
    tags: ['Conferência', 'Grande Porte', 'Recife'],
    amenities: ['wifi', 'projector', 'sound', 'coffee', 'water'],
  }
];
