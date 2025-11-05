# SunCity Enrollment Flow

This project is a web application for enrolling in the SunCity program. It includes a frontend built with React and Vite, and a backend using Supabase for database, authentication, and serverless functions.

## Getting Started

### Prerequisites

- Node.js and npm
- Supabase account

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/suncity-enroll-flow.git
    cd suncity-enroll-flow
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the project and add the following environment variables:

    ```
    VITE_SUPABASE_PROJECT_ID="your-supabase-project-id"
    VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
    VITE_SUPABASE_URL="https://your-supabase-project-id.supabase.co"
    ```

### Supabase Setup

1.  **Create a new Supabase project.**

2.  **Create the `enrollments` table:**

    Go to the SQL Editor in your Supabase dashboard and run the following query:

    ```sql
    CREATE TABLE enrollments (
      enrollment_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      working_in_solar BOOLEAN NOT NULL,
      referral_code TEXT,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      payment_id TEXT,
      id_proof_path TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    ```

3.  **Create the `enrollment-id-proofs` storage bucket:**

    - Go to the Storage section in your Supabase dashboard.
    - Click on "New bucket".
    - Enter `enrollment-id-proofs` as the bucket name.
    - Make the bucket **public**.

4.  **Set up storage policies:**

    Go to `Storage` > `Policies` and add the following policies for the `enrollment-id-proofs` bucket:

    - **Allow public read access:**

      ```sql
      CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING ( bucket_id = 'enrollment-id-proofs' );
      ```

    - **Allow authenticated users to upload:**

      ```sql
      CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'enrollment-id-proofs' AND auth.role() = 'authenticated' );
      ```

5.  **Set up environment variables for Supabase Functions:**

    Go to `Settings` > `Functions` in your Supabase dashboard and add the following environment variables:

    - `SUPABASE_URL`: The URL of your Supabase project.
    - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase project's service role key.
    - `CASHFREE_APP_ID`: Your Cashfree application ID.
    - `CASHFREE_SECRET_KEY`: Your Cashfree secret key.

### Running the Application

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.
