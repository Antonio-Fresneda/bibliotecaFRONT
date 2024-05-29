export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

  {
    bgcolor: 'success',
    icon: 'bi bi-book',
    title: 'Libros',
    subtitle: '3 disponibles'
  } ,
  {
    bgcolor: 'danger',
    icon: 'bi bi-journal-bookmark',
    title: 'Generos',
    subtitle: '4 disponibles'
  },
  {
    bgcolor: 'warning',
    icon: 'bi bi-people',
    title: 'Autores',
    subtitle: '2 disponibles'
  },
  {
    bgcolor: 'info',
    icon: 'bi bi-bookshelf',
    title: 'Bibliotecas',
    subtitle: '1 disponibles'
  },
    /*{
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '$21k',
        subtitle: 'Yearly Earning'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '$1k',
        subtitle: 'Refund given'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '456',
        subtitle: 'Yearly Project'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Weekly Sales'
    },*/

]
