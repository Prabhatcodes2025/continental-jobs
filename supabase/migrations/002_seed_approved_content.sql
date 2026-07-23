-- Approved frontend content seed. Includes only client-approved countries.

insert into public.services (title, slug, short_description, icon, display_order, active) values
('WORK ABROAD', 'work-abroad', 'Ethical overseas placement support for skilled, technical and professional talent.', 'BriefcaseBusiness', 1, true),
('HUMAN RESOURCE SOLUTIONS', 'human-resource-solutions', 'End-to-end global recruitment support for workforce demands across destination markets.', 'UsersRound', 2, true),
('STUDY ABROAD', 'study-abroad', 'Education pathway guidance for international universities, technical studies and career mobility.', 'GraduationCap', 3, true),
('MIGRATION', 'migration', 'Documentation-led guidance for compliant migration, visa and work permit processes.', 'MapPinned', 4, true),
('SKILL DEVELOPMENT', 'skill-development', 'Candidate screening, trade orientation and readiness support before deployment.', 'BadgeCheck', 5, true),
('GLOBAL RECRUITMENT', 'global-recruitment', 'Shortlisting, interview coordination, mobilization and employer reporting.', 'Building2', 6, true)
on conflict (slug) do update set title = excluded.title, short_description = excluded.short_description, active = excluded.active;

insert into public.industries (title, slug, description, icon, image_path, display_order, active) values
('Healthcare', 'healthcare', 'Doctors, nurses and paramedical staffing for international hospitals.', 'HeartPulse', '/sectors/healthcare.svg', 1, true),
('Oil & Gas', 'oil-gas', 'Project workforce for oil, gas and petrochemical environments.', 'Wrench', '/sectors/oil-gas.svg', 2, true),
('Refinery and Shutdown Maintenance', 'refinery-shutdown-maintenance', 'Shutdown, maintenance and plant support teams.', 'Hammer', '/sectors/refinery-shutdown.svg', 3, true),
('Engineering', 'engineering', 'Engineering and technical professionals for global projects.', 'Wrench', '/sectors/engineering.svg', 4, true),
('Construction', 'construction', 'Skilled construction workforce for overseas employers.', 'HardHat', '/sectors/construction.svg', 5, true),
('Infrastructure', 'infrastructure', 'Roads, ports, cities and large infrastructure project staffing.', 'Building2', '/sectors/infrastructure.svg', 6, true),
('MEP', 'mep', 'Mechanical, electrical and plumbing project teams.', 'Wind', '/sectors/mep.svg', 7, true),
('Security Professionals', 'security-professionals', 'Security guards and facility protection professionals.', 'ShieldCheck', '/sectors/security.svg', 8, true),
('Hypermarkets / Retail', 'hypermarkets-retail', 'Retail, hypermarket and supermarket staffing support.', 'ShoppingCart', '/sectors/retail.svg', 9, true),
('Hotel, Catering and Housekeeping', 'hotel-catering-housekeeping', 'Hospitality, catering, housekeeping and food service staff.', 'UtensilsCrossed', '/sectors/hospitality.svg', 10, true),
('Shipbuilding and Ship Repair', 'shipbuilding-ship-repair', 'Technical workforce for shipbuilding, repair and maintenance.', 'Ship', '/sectors/shipbuilding.svg', 11, true),
('Technical and Professional Studies', 'technical-professional-studies', 'Training pathways for technical and professional readiness.', 'GraduationCap', '/sectors/technical-studies.svg', 12, true)
on conflict (slug) do update set title = excluded.title, description = excluded.description, image_path = excluded.image_path, active = excluded.active;

insert into public.gallery_items (title, category, caption, image_path, alt_text, display_order, active) values
('Corporate Office, India', 'Corporate', 'Continental Towers, India.', '/brand/corporate-office-kochi.png', 'Continental corporate office building in India', 1, true),
('Indian Operations', 'Indian Operations', 'Regional presence across approved Indian recruitment corridors.', '/brand/indian-operations-map-corrected.svg', 'Approved Indian Operations map', 2, true),
('Dubai Recruitment', 'Recruitment Campaigns', 'Hypermarket and food industry staffing campaigns.', '/gallery/dubai-hiring.png', 'Dubai recruitment campaign visual', 3, true),
('Europe Work Permit', 'Recruitment Campaigns', 'Work abroad opportunity communications.', '/gallery/spain-work-permit.png', 'Europe work permit campaign visual', 4, true)
on conflict do nothing;

insert into public.recruitment_process_steps (step_number, phase, title, display_order, active) values
(1, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Receipt of Manpower Requirement Order', 1, true),
(2, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Verification of Salary & Other Employment Terms Offered to the Workers', 2, true),
(3, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Verification & Finalisation of Recruitment Fees & Terms', 3, true),
(4, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Finalisation & Signing of the Recruitment Process Agreement', 4, true),
(5, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Create Emigrate Documents by the Client', 5, true),
(6, 'PHASE 1 - REQUIREMENT & AGREEMENT', 'Receipt of Power of Attorney & Demand Letter etc. Documents Required for Conducting Interview', 6, true),
(7, 'PHASE 2 - PLANNING & SOURCING', 'Finalisation of Recruitment Procedures & Methods', 7, true),
(8, 'PHASE 2 - PLANNING & SOURCING', 'Finalisation of the Itinerary of Interview', 8, true),
(9, 'PHASE 2 - PLANNING & SOURCING', 'Search in the Data Bank Availability of Sufficient CVs', 9, true),
(10, 'PHASE 2 - PLANNING & SOURCING', 'Advertise through newspapers, digital media and headhunt until sufficient CVs are procured', 10, true),
(11, 'PHASE 2 - PLANNING & SOURCING', 'Screening of Candidates and Lining up of Sufficient Candidates as per Client Specification', 11, true),
(12, 'PHASE 3 - INTERVIEW & SELECTION', 'Prepare for Final Interview', 12, true),
(13, 'PHASE 3 - INTERVIEW & SELECTION', 'Client Conducts Interview or Authorises Continental to Conduct Table/Skype Interview', 13, true),
(14, 'PHASE 3 - INTERVIEW & SELECTION', 'If Required Conducts Practical Trade Testing', 14, true),
(15, 'PHASE 3 - INTERVIEW & SELECTION', 'Signs Employment Contract', 15, true),
(16, 'PHASE 3 - INTERVIEW & SELECTION', 'Candidate Undergoes Medical Examination', 16, true),
(17, 'PHASE 4 - VISA & MOBILISATION', 'Prepares All Documents Required for Visa Processing', 17, true),
(18, 'PHASE 4 - VISA & MOBILISATION', 'Receive Visas & Completion of Visa Formalities', 18, true),
(19, 'PHASE 4 - VISA & MOBILISATION', 'Completing Insurance Formalities', 19, true),
(20, 'PHASE 4 - VISA & MOBILISATION', 'Completing Immigration Formalities', 20, true),
(21, 'PHASE 4 - VISA & MOBILISATION', 'Completing Air Ticketing & Reservation', 21, true),
(22, 'PHASE 4 - VISA & MOBILISATION', 'Forwarding Bills to the Client for Necessary Fees', 22, true),
(23, 'PHASE 4 - VISA & MOBILISATION', 'Pre-Departure Assistance & Orientation to the Workers', 23, true),
(24, 'PHASE 4 - VISA & MOBILISATION', 'Departure of Contract Workers to the Projects', 24, true),
(25, 'PHASE 5 - POST-DEPLOYMENT SUPPORT', 'Follow-up and Monitoring the Status & Welfare of Workers Mobilized', 25, true)
on conflict (step_number) do update set phase = excluded.phase, title = excluded.title, active = excluded.active;
