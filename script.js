function calculateNutrition() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const days = parseFloat(document.getElementById('days').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const goal = document.getElementById('goal').value;
    const meals = parseFloat(document.getElementById('meals').value);

    // ตรวจสอบค่าที่ได้รับ
    console.log("Weight:", weight, "Height:", height, "Age:", age, "Gender:", gender, "Days:", days, "Hours:", hours, "Goal:", goal, "Meals:", meals);

    // ตรวจสอบค่าที่ไม่ใช่ตัวเลข
    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(days) || isNaN(hours) || isNaN(meals)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
        return;
    }

    // คำนวณ BMR
    let BMR;
    if (gender === 'male') {
        BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // คำนวณระดับกิจกรรมทางกาย
    let activityMultiplier;
    const totalHoursPerWeek = days * hours;

    if (totalHoursPerWeek <= 0) {
        activityMultiplier = 1.2;  // ไม่ออกกำลังกาย (Sedentary)
    } else if (totalHoursPerWeek <= 3.5) {
        activityMultiplier = 1.375;  // ออกกำลังกายน้อย (Lightly Active)
    } else if (totalHoursPerWeek <= 7) {
        activityMultiplier = 1.55;  // ออกกำลังกายปานกลาง (Moderately Active)
    } else if (totalHoursPerWeek <= 14) {
        activityMultiplier = 1.725;  // ออกกำลังกายหนัก (Very Active)
    } else {
        activityMultiplier = 1.9;  // ออกกำลังกายหนักมาก (Super Active)
    }
    const TDEE = BMR * activityMultiplier;

    // คำนวณปริมาณสารอาหาร
    let proteinPerKg, carbPercentage, fatPercentage;
    if (goal === 'gain') {
        proteinPerKg = 1.8;
        carbPercentage = 0.45;  // ลดสัดส่วนคาร์โบไฮเดรตลง
        fatPercentage = 0.30;
    } else if (goal === 'maintain') {
        proteinPerKg = 1.2;
        carbPercentage = 0.45;
        fatPercentage = 0.30;
    } else {
        proteinPerKg = 1.0;
        carbPercentage = 0.40;
        fatPercentage = 0.35;
    }

    const dailyProtein = weight * proteinPerKg;
    const dailyCarbs = (TDEE * carbPercentage) / 4;  // 1 กรัมคาร์โบไฮเดรต = 4 แคลอรี่
    const dailyFat = (TDEE * fatPercentage) / 9;    // 1 กรัมไขมัน = 9 แคลอรี่
    const proteinPerMeal = dailyProtein / meals;
    const carbsPerMeal = dailyCarbs / meals;
    const fatPerMeal = dailyFat / meals;
    const caloriesPerMeal = TDEE / meals;
    const hoursBetweenMeals = 24 / meals;

    // ตรวจสอบค่าที่คำนวณได้
    console.log("BMR:", BMR, "TDEE:", TDEE, "dailyProtein:", dailyProtein, "dailyCarbs:", dailyCarbs, "dailyFat:", dailyFat);

    let recommendedHours = '';
    if (meals == 3) {
        recommendedHours = 'ประมาณ 4-6 ชั่วโมงระหว่างมื้อ';
    } else if (meals == 4) {
        recommendedHours = 'ประมาณ 4 ชั่วโมงระหว่างมื้อ';
    } else if (meals == 5) {
        recommendedHours = 'ประมาณ 3-4 ชั่วโมงระหว่างมื้อ';
    } else {
        recommendedHours = 'ประมาณ 3 ชั่วโมงระหว่างมื้อ';
    }

    document.getElementById('result').innerHTML = `
        โปรตีนที่ต้องการต่อวัน: ${dailyProtein.toFixed(2)} กรัม<br>
        คาร์โบไฮเดรตที่ต้องการต่อวัน: ${dailyCarbs.toFixed(2)} กรัม<br>
        ไขมันที่ต้องการต่อวัน: ${dailyFat.toFixed(2)} กรัม<br>
        แคลอรี่ที่ต้องการต่อวัน: ${TDEE.toFixed(2)} แคลอรี่<br>
        <br>
        โปรตีนต่อมื้อ: ${proteinPerMeal.toFixed(2)} กรัม<br>
        คาร์โบไฮเดรตต่อมื้อ: ${carbsPerMeal.toFixed(2)} กรัม<br>
        ไขมันต่อมื้อ: ${fatPerMeal.toFixed(2)} กรัม<br>
        แคลอรี่ต่อมื้อ: ${caloriesPerMeal.toFixed(2)} แคลอรี่<br>
        จำนวนมื้ออาหารต่อวัน: ${meals} มื้อ<br>
        ระยะห่างแต่ละมื้อ: ${recommendedHours}
    `;
}
