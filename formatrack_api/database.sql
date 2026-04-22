-- ============================================================
-- FORMATRACK - SCHÉMA SQL FINAL
-- Principe : Heures planifiées → Heures écoulées → Fin → Admission
-- ============================================================

-- ------------------------------------------------------------
-- 1. UTILISATEURS
-- ------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'INSTRUCTOR', 'STUDENT')),
    phone VARCHAR(30),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 2. FORMATEURS
-- ------------------------------------------------------------
CREATE TABLE instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialties TEXT,
    hourly_rate DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 3. ÉTUDIANTS
-- ------------------------------------------------------------
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    student_number VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30),
    birth_date DATE,
    birth_place VARCHAR(100),
    nationality VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    emergency_contact TEXT,
    education_level VARCHAR(100),
    professional_situation VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 4. SALLES
-- ------------------------------------------------------------
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('COURS', 'INFORMATIQUE', 'LABORATOIRE', 'CONFERENCE', 'AUTRE')),
    capacity INTEGER NOT NULL,
    equipments TEXT,
    building VARCHAR(100),
    floor INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 5. COURS
-- ------------------------------------------------------------
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    photo_url TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'INFORMATIQUE', 'LANGUES', 'MANAGEMENT', 'COMPTABILITE',
        'MARKETING', 'DESIGN', 'DEVELOPPEMENT_PERSONNEL', 'AUTRE'
    )),
    total_hours INTEGER NOT NULL,
    max_students INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    prerequisites TEXT,
    objectives TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 6. SESSIONS
-- ------------------------------------------------------------
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES instructors(id),
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    planned_hours INTEGER NOT NULL,
    completed_hours INTEGER DEFAULT 0,
    qr_code_token UUID,
    qr_code_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 7. FICHES D'INSCRIPTION
-- ------------------------------------------------------------
CREATE TABLE registration_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    session_id UUID NOT NULL REFERENCES sessions(id),
    submission_date DATE DEFAULT CURRENT_DATE,
    validation_date DATE,
    funding_type VARCHAR(50) NOT NULL CHECK (funding_type IN (
        'PERSONAL', 'CPF', 'EMPLOYER', 'OPCO', 'POLE_EMPLOI', 'AUTRE'
    )),
    funding_amount DECIMAL(10,2) DEFAULT 0,
    self_funded_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    id_document_url TEXT,
    diploma_document_url TEXT,
    funding_proof_url TEXT,
    photo_url TEXT,
    status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN (
        'DRAFT', 'SUBMITTED', 'VALIDATED', 'REJECTED', 'CANCELLED'
    )),
    validated_by UUID REFERENCES users(id),
    validation_notes TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, session_id)
);

-- ------------------------------------------------------------
-- 8. INSCRIPTIONS
-- ------------------------------------------------------------
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    session_id UUID NOT NULL REFERENCES sessions(id),
    form_id UUID UNIQUE REFERENCES registration_forms(id),
    registration_date DATE DEFAULT CURRENT_DATE,
    attended_hours INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    payment_status VARCHAR(50) DEFAULT 'PENDING' CHECK (payment_status IN (
        'PENDING', 'PARTIAL', 'PAID', 'REFUNDED'
    )),
    final_grade DECIMAL(5,2) CHECK (final_grade BETWEEN 0 AND 100),
    is_admitted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, session_id)
);

-- ------------------------------------------------------------
-- 9. CERTIFICATS
-- ------------------------------------------------------------
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    registration_id UUID UNIQUE NOT NULL REFERENCES registrations(id),
    student_full_name VARCHAR(255) NOT NULL,
    student_birth_date DATE,
    student_birth_place VARCHAR(100),
    course_title VARCHAR(255) NOT NULL,
    course_total_hours INTEGER NOT NULL,
    training_start_date DATE NOT NULL,
    training_end_date DATE NOT NULL,
    issue_date DATE NOT NULL,
    attended_hours INTEGER NOT NULL,
    final_grade DECIMAL(5,2),
    mention VARCHAR(50) CHECK (mention IN (
        'PASSABLE', 'ASSEZ_BIEN', 'BIEN', 'TRES_BIEN', 'EXCELLENT'
    )),
    acquired_skills TEXT,
    pdf_url TEXT,
    verification_url TEXT,
    signed_by UUID REFERENCES users(id),
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 10. PRÉSENCES
-- ------------------------------------------------------------
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id),
    student_id UUID NOT NULL REFERENCES students(id),
    date DATE NOT NULL,
    hours_attended INTEGER DEFAULT 0,
    check_in_time TIMESTAMPTZ,
    check_method VARCHAR(50) DEFAULT 'MANUAL' CHECK (check_method IN ('MANUAL', 'QR_CODE')),
    marked_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (session_id, student_id, date)
);

-- ------------------------------------------------------------
-- 11. PAIEMENTS
-- ------------------------------------------------------------
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID NOT NULL REFERENCES registrations(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN (
        'CASH', 'BANK_TRANSFER', 'CREDIT_CARD', 'CHECK', 'MOBILE_MONEY'
    )),
    transaction_id VARCHAR(255),
    receipt_url TEXT,
    received_by UUID NOT NULL REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 12. INDEXES
-- ------------------------------------------------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_instructors_user_id ON instructors(user_id);

CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_student_number ON students(student_number);
CREATE INDEX idx_students_user_id ON students(user_id);

CREATE INDEX idx_rooms_code ON rooms(code);
CREATE INDEX idx_rooms_type ON rooms(type);
CREATE INDEX idx_rooms_active ON rooms(is_active);

CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_category ON courses(category);

CREATE INDEX idx_sessions_course_id ON sessions(course_id);
CREATE INDEX idx_sessions_instructor_id ON sessions(instructor_id);
CREATE INDEX idx_sessions_room_id ON sessions(room_id);
CREATE INDEX idx_sessions_dates ON sessions(start_date, end_date);

CREATE INDEX idx_registration_forms_form_number ON registration_forms(form_number);
CREATE INDEX idx_registration_forms_student_id ON registration_forms(student_id);
CREATE INDEX idx_registration_forms_session_id ON registration_forms(session_id);
CREATE INDEX idx_registration_forms_status ON registration_forms(status);

CREATE INDEX idx_registrations_registration_number ON registrations(registration_number);
CREATE INDEX idx_registrations_student_id ON registrations(student_id);
CREATE INDEX idx_registrations_session_id ON registrations(session_id);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX idx_registrations_admitted ON registrations(is_admitted);

CREATE INDEX idx_certificates_certificate_number ON certificates(certificate_number);
CREATE INDEX idx_certificates_registration_id ON certificates(registration_id);

CREATE INDEX idx_attendances_session_id ON attendances(session_id);
CREATE INDEX idx_attendances_student_id ON attendances(student_id);
CREATE INDEX idx_attendances_date ON attendances(date);

CREATE INDEX idx_payments_registration_id ON payments(registration_id);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);