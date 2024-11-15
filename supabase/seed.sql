-- Insert into auth.users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    is_sso_user,
    is_anonymous
) VALUES
(
    '00000000-0000-0000-0000-000000000000', -- instance_id
    'f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28', -- id
    'authenticated', -- aud
    'authenticated', -- role
    'admin@admin.com', -- email
    '$2a$10$sd.YIZ92vmexCvna6rGS1usxFIL/GvAEvDtM6E2LN2QMCYZIVSwLO', -- encrypted_password
    current_timestamp, -- email_confirmed_at
    current_timestamp, -- last_sign_in_at
    '{"provider": "email", "providers": ["email"]}'::jsonb, -- raw_app_meta_data
    '{
        "sub": "f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28",
        "email": "admin@admin.com",
        "first_name": "John",
        "last_name": "Nolan",
        "phone_number": "123456789",
        "email_verified": false,
        "phone_verified": false
    }'::jsonb, -- raw_user_meta_data
    current_timestamp, -- created_at
    current_timestamp, -- updated_at
    '', -- confirmation_token
    '', -- email_change
    '', -- email_change_token_new
    '', -- recovery_token
    FALSE, -- is_sso_user
    FALSE -- is_anonymous
);

-- Insert into auth.identities
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, id, created_at, updated_at) VALUES ('f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28', 'f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28', '{"sub": "f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28","email": "admin@admin.com","email_verified": false,"phone_verified": false}'::jsonb, 'email', '864eee4a-a70e-493c-b2c4-02d5779065b4', current_timestamp, current_timestamp);

-- Insert into public.profiles
INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at) VALUES
('f9c7ca6f-f3d6-45b0-a6f7-4c55ab207d28', 'admin@admin.com', 'John', 'Nolan', current_timestamp, current_timestamp);
