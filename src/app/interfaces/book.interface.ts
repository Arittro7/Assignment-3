interface availability {
  availability: (borrowedCopies: number) => void
}

export interface IBook extends availability{
  title: string,
  author: string,
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
  isbn: string,
  description : string,
  copies: number,
  available : boolean 
}