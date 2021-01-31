import IInspection from './IInspection';

export default interface IFormattedInspection {
  name: string;
  send_date: string;
  limit_date: string;
  status: JSX.Element;
  original: IInspection;
}
