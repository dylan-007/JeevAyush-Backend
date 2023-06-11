function diseaseMap (disease) {

    if(disease == 'Fungal infection') return 'dermatology';
    if(disease == 'Allergy') return 'immunology';
    if(disease == 'GERD') return 'gastroenterology';
    if(disease == 'Acne') return 'dermatology';
    if(disease == 'hepatitis A') return 'hepatology';
    if(disease == 'hepatitis B') return 'hepatology';
    if(disease == 'hepatitis C') return 'hepatology';
    if(disease == 'hepatitis D') return 'hepatology';
    if(disease == 'hepatitis E') return 'hepatology';
    if(disease == 'Chronic cholestasis') return 'gastroenterology';
    if(disease == 'Drug Reaction') return 'pharma';
    if(disease == 'Peptic ulcer disease') return 'gastroenterology';
    if(disease == 'AIDS') return 'hiv';
    if(disease == 'Diabetes') return 'endocrinology';
    if(disease == 'Gastroenteritis') return 'gastroenterology';
    if(disease == 'Bronchial Asthma') return 'asthma';
    if(disease == 'Hypertension') return 'cardiology';
    if(disease == 'Migraine') return 'neurology';
    if(disease == 'Cervical spondylosis') return 'otolaryngology';
    if(disease == 'Paralysis (brain hemorrhage)') return 'paralysis';
    if(disease == 'Jaundice') return 'gastroenterology';
    if(disease == 'Malaria') return 'general';
    if(disease == 'Chicken pox') return 'general';
    if(disease == 'Dengue') return 'microbiology';
    if(disease == 'Typhoid') return 'general';
    if(disease == 'Alcoholic hepatitis') return 'gastroenterology';
    if(disease == 'Tuberculosis') return 'pulmonology';
    if(disease == 'Common Cold') return 'otolaryngology';
    if(disease == 'Pneumonia') return 'pediatric';
    if(disease == 'Dimorphic hemmorhoids(piles)') return 'proctology';
    if(disease == 'Heart attack') return 'cardiology';
    if(disease == 'Varicose veins') return 'endocrinology';
    if(disease == 'Hypothyroidism') return 'endocrinology';
    if(disease == 'Hyperthyroidism') return 'endocrinology';
    if(disease == 'Hypoglycemia') return 'endocrinology';
    if(disease == 'Osteoarthristis') return 'orthopedy';
    if(disease == 'Arthritis') return 'orthopedy';
    if(disease == '(vertigo) Paroymsal Positional Vertigo') return 'ent';
    if(disease == 'Urinary tract infection','Urologist') return 'urology';
    if(disease == 'Psoriasis') return 'general';
    if(disease == 'Impetigo' ) return 'general';
    
}

module.exports = {diseaseMap};