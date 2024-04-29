export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        class: 'bg-info',
        icon: 'bi bi-bell',
        task: 'Un libro ha sido asignado a una biblioteca.',
        time: 'Just Now'
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Server #1 reiniciado.',
        time: 'Hace 1 hora'
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-bag-check',
        task: 'Solicitud de creacion de  biblioteca .',
        time: '22 Abril'
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: 'Nuevo autor registrado.',
        time: '19 Abril'
    },
    {
      class: 'bg-danger',
      icon: 'bi bi-journal-bookmark',
      task: 'Nuevo genero registrado.',
      time: '19 May'
  },


]
