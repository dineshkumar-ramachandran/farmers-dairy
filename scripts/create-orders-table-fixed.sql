-- Drop existing table if it exists and create new one with correct structure
DROP TABLE IF EXISTS public.orders;

CREATE TABLE public.orders (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    customer_pincode TEXT NOT NULL,
    special_instructions TEXT,
    order_details TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    razorpay_payment_id TEXT,
    order_date TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'Confirmed',
    items JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_order_id ON public.orders(order_id);
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_orders_order_date ON public.orders(order_date DESC);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations on orders" ON public.orders
    FOR ALL USING (true) WITH CHECK (true);

-- Insert a test order
INSERT INTO public.orders (
    order_id,
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    customer_city,
    customer_pincode,
    special_instructions,
    order_details,
    total_amount,
    payment_method,
    status,
    items
) VALUES (
    'FD_TEST_' || EXTRACT(EPOCH FROM NOW())::TEXT,
    'Test Customer',
    'test@example.com',
    '9876543210',
    '123 Test Street, Test Area',
    'Test City',
    '123456',
    'Test order for verification',
    'Sample Milk 500ml - Cash on Delivery',
    25.00,
    'Cash on Delivery',
    'Confirmed',
    '[{"name": "Sample Milk 500ml", "quantity": 1, "price": 25, "subscription": "sample", "sampleSize": "500ml"}]'::jsonb
);
