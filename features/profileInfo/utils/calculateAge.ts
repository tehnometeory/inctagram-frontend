const MIN_AGE = 1 //исправить на 13, когда изменим DatePicker

export const calculateAge = (birthDate: Date): boolean => {
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  // Проверяем, прошел ли день рождения в этом году
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasBirthdayPassed) {
    age -= 1
  }

  return age >= MIN_AGE
}
