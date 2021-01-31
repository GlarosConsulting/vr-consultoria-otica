export type Status = 'pending' | 'approved' | 'refused';

interface IBreakdown {
  id: string;
  breakdown_url: string;
}

interface IGlass {
  id: string;
  glass_url: string;
  name: string;
}

export default interface IInspection {
  id: string;
  user_id: string;
  status: Status;
  limit_date: string;
  created_at: string;
  updated_at: string;
  images: {
    forward_img_url: string;
    croup_img_url: string;
    left_side_img_url: string;
    right_side_img_url: string;
    motor_img_url: string;
    chassi_img_url: string;
    document_img_url: string;
    panel_img_url: string;
    forward_left_img_url?: string;
    forward_right_img_url?: string;
    rear_left_img_url?: string;
    rear_right_img_url?: string;
    forward_right_with_opened_hood_img_url?: string;
    forward_left_with_opened_hood_img_url?: string;
    forward_with_opened_hood_img_url?: string;
    rear_plate_img_url?: string;
    opened_trunk_img_url?: string;
    seal_plate_img_url?: string;
    spare_tire_img_url?: string;
    key_img_url?: string;
    forward_right_wheel_img_url?: string;
    forward_left_wheel_img_url?: string;
    rear_left_wheel_img_url?: string;
    rear_right_wheel_img_url?: string;
    left_column_img_url?: string;
    right_column_img_url?: string;
    pedometer_img_url?: string;
    forward_right_tire_img_url?: string;
    forward_left_tire_img_url?: string;
    rear_right_tire_img_url?: string;
    rear_left_tire_img_url?: string;
    console_img_url?: string;
    engine_number_img_url?: string;
    forward_right_buffer_img_url?: string;
    forward_left_buffer_img_url?: string;
    rear_right_buffer_img_url?: string;
    rear_left_buffer_img_url?: string;
    breakdowns: IBreakdown[];
    glass: IGlass[];
  };
}
