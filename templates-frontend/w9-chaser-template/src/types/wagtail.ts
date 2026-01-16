export interface DocumentUploadBlock {
  type: "document_upload";
  value: {
    allowed_file_types: string[];
    max_file_size: number;
    require_before_booking: boolean;
    instructions: string;
    privacy_notice: string;
  };
  id: string;
}

export interface BookingBlock {
  type: "booking";
  value: {
    booking_type: "office" | "mobile" | "remote";
    calendar_source: "internal" | "google" | "outlook";
    duration_options: string[];
    buffer_time: number;
    require_payment: boolean;
    confirmation_message: string;
  };
  id: string;
}

export interface PaymentBlock {
  type: "payment";
  value: {
    payment_type: "full" | "deposit";
    amount: string;
    description: string;
    require_before_proceeding: boolean;
    success_message: string;
  };
  id: string;
}
