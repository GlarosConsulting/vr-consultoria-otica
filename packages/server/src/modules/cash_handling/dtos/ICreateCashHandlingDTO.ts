export default interface ICreateUserDTO {
  date: Date;
  bank_value: number;
  return_value: number;
  bank_tariff_value: number;
  is_previous_balance?: boolean;
}
