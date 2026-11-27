-- Sevencore Attendance schema. Created on the first start (docker compose locally, deploy/run.py in the cloud).
-- Unique keys match the upserts the app makes (telegram_id | key_name | telegram_id,date).

CREATE TABLE IF NOT EXISTS admin_users (
    id           text PRIMARY KEY DEFAULT ('admin-' || gen_random_uuid()),
    username     text UNIQUE,
    password     text,
    display_name text,
    role         text,
    created_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dev_users (
    id          text PRIMARY KEY DEFAULT ('dev-' || gen_random_uuid()),
    username    text UNIQUE,
    password    text,
    role        text,
    full_access boolean DEFAULT false,
    created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employees (
    telegram_id      bigint PRIMARY KEY,
    first_name       text,
    last_name        text,
    username         text,
    photo_url        text,
    department       text,
    is_verified      boolean DEFAULT false,
    shift_name       text,
    shift_start_time text,
    shift_end_time   text,
    shift_days       jsonb,
    created_at       timestamptz DEFAULT now(),
    updated_at       timestamptz DEFAULT now()
);
-- Shift group (Day Shift, Night Shift, ...): the panel splits the schedule and reports by it.
-- The list of groups lives in system_settings (key 'shift_groups').
ALTER TABLE employees ADD COLUMN IF NOT EXISTS shift_group text;

CREATE TABLE IF NOT EXISTS managers (
    id                    text PRIMARY KEY DEFAULT ('mgr-' || gen_random_uuid()),
    username              text UNIQUE,
    password              text,
    full_name             text,
    department            text,
    team_name             text,
    assigned_employee_ids jsonb,
    shift_start_time      text,
    shift_end_time        text,
    shift_days            jsonb,
    created_at            timestamptz DEFAULT now(),
    updated_at            timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id                 text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    telegram_id        bigint,
    action_type        text,
    "timestamp"        timestamptz,
    photo_url          text,
    latitude           double precision,
    longitude          double precision,
    distance_meters    integer,
    note               text,
    admin_note         text,
    duration_formatted text,
    created_at         timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS attendance_logs_tg_ts ON attendance_logs (telegram_id, "timestamp");
CREATE INDEX IF NOT EXISTS attendance_logs_ts ON attendance_logs ("timestamp");

CREATE TABLE IF NOT EXISTS attendance_day_notes (
    id          text PRIMARY KEY DEFAULT ('note-' || gen_random_uuid()),
    telegram_id bigint,
    date        date,
    note        text,
    author_name text,
    created_at  timestamptz DEFAULT now(),
    updated_at  timestamptz DEFAULT now(),
    UNIQUE (telegram_id, date)
);

CREATE TABLE IF NOT EXISTS team_schedules (
    id              text PRIMARY KEY DEFAULT ('sched-' || gen_random_uuid()),
    week_start_date date,
    telegram_id     bigint,
    department      text,
    manager_id      text,
    monday          jsonb,
    tuesday         jsonb,
    wednesday       jsonb,
    thursday        jsonb,
    friday          jsonb,
    saturday        jsonb,
    sunday          jsonb,
    updated_by      text,
    updated_at      timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS team_schedules_week ON team_schedules (week_start_date, telegram_id);

CREATE TABLE IF NOT EXISTS organization_security (
    id                     text PRIMARY KEY DEFAULT ('sec-' || gen_random_uuid()),
    key_name               text UNIQUE,
    passkey                text,
    description            text,
    security_pin           text,
    geofence_lat           double precision,
    geofence_lng           double precision,
    geofence_radius_meters integer,
    enforce_geofence       boolean DEFAULT true,
    enforce_selfie         boolean DEFAULT true,
    updated_by             text,
    updated_at             timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_settings (
    key        text PRIMARY KEY,
    value      text,
    updated_at timestamptz DEFAULT now()
);

-- Face ID templates for the Telegram Mini App (server/tma). Never exposed through /rest/v1.
CREATE TABLE IF NOT EXISTS face_profiles (
    telegram_id  bigint PRIMARY KEY,
    embedding    text NOT NULL,          -- 128-d SFace template, float32, base64
    photo        text,                   -- enrolment face crop (data URL)
    enrolled_at  timestamptz DEFAULT now(),
    updated_at   timestamptz DEFAULT now(),
    checks       integer DEFAULT 0,
    last_score   real,
    last_used_at timestamptz
);

-- PostgREST role (local docker; the cloud uses the database owner, see deploy/run.py). PostgREST listens on
-- 127.0.0.1 and its only client is the app server, which checks the user's role and department;
-- the browser never talks to the database.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'web_anon') THEN
        CREATE ROLE web_anon NOLOGIN;
    END IF;
END $$;
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO web_anon;
