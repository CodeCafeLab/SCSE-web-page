-- Create function to update timestamps first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create enrollments table to store student enrollment data
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  qualification TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  address TEXT NOT NULL,
  working_in_solar BOOLEAN NOT NULL,
  referral_code TEXT,
  id_proof_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  payment_amount DECIMAL(10,2) NOT NULL DEFAULT 11700.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert their own enrollment
CREATE POLICY "Anyone can create enrollment"
ON public.enrollments
FOR INSERT
WITH CHECK (true);

-- Create policy for users to view their own enrollments by email
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments
FOR SELECT
USING (true);

-- Create function to generate unique enrollment ID
CREATE OR REPLACE FUNCTION generate_enrollment_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  done BOOLEAN;
BEGIN
  done := false;
  WHILE NOT done LOOP
    new_id := 'SUN' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
    done := NOT EXISTS(SELECT 1 FROM public.enrollments WHERE enrollment_id = new_id);
  END LOOP;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate enrollment ID
CREATE OR REPLACE FUNCTION set_enrollment_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.enrollment_id IS NULL OR NEW.enrollment_id = '' THEN
    NEW.enrollment_id := generate_enrollment_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_enrollment_id
BEFORE INSERT ON public.enrollments
FOR EACH ROW
EXECUTE FUNCTION set_enrollment_id();

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_enrollments_updated_at
BEFORE UPDATE ON public.enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();