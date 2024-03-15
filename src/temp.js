export const serverURL = 'http://localhost:8000';
// export const serverURL = 'https://edu-link-be.vercel.app';

let schoolData = localStorage.getItem('schools');
let collegeData = localStorage.getItem('colleges');
console.log("collegeData", collegeData);
// Parse the data retrieved from local storage if it exists
if (schoolData && collegeData) {
    try {
        // Split the string into an array using comma as the separator
        schoolData = schoolData.split(',');
        collegeData = collegeData.split(',');
    } catch (error) {
        console.error("Error parsing 'schools' data from localStorage:", error);
        // Handle parsing error if necessary
        schoolData = [];
        collegeData = []
    }
} else {
    schoolData = [];
    collegeData = [];

}

// Registration Input Enums
export const domicileEnums = ['Sindh', 'Punjab', 'Karachi', 'Gilgit/Baltistan'];
export const classEnums = ['IX', 'X', 'XI', 'XII'];
export const groupNameEnums = ['SCIENCE', 'MEDICAL', 'PRE-ENGINEERING', 'PRE-MEDICAL'];
export const currentResidenceEnums = ['Is own by our family', 'Is rented to us'];
export const statusEnums = ['ACTIVE', 'INACTIVE', 'BLOCKED'];
export const fatherStatusEnums = ['ALIVE', 'LATE', 'MARTYRED', 'MISSING', 'SEPERATED'];
export const medicalIllnessEnums = ['Allergic', 'Disability', 'Special Medication', 'None'];
if (Array.isArray(schoolData)) {
    schoolData.push('Other');
}
export const schoolEnums = schoolData;
if (Array.isArray(collegeData)) {
    collegeData.push('Other');
}
export const collegeEnums = collegeData;
// export const schoolEnums = ['Qamar e Bani Hashim', 'Hasan Academy', 'Young Citizen', 'Sunrise School', 'Other']

