interface IReturn {
  label: 'Pendente' | 'Aprovado' | 'Recusado' | 'Não informado';
  color: string;
}

export default function getStatusFromInspections(
  status: 'pending' | 'approved' | 'refused',
): IReturn | null {
  switch (status) {
    case 'pending':
      return {
        label: 'Pendente',
        color: '#F6E05E',
      };

    case 'approved':
      return {
        label: 'Aprovado',
        color: '#68D391',
      };

    case 'refused':
      return {
        label: 'Recusado',
        color: '#E53E3E',
      };

    default:
      return {
        label: 'Não informado',
        color: '#888',
      };
  }
}
