export function getCentralBankData(offices) {
  if (!offices) {
    return null;
  }

  return offices.find((office) => office.is_central_bank);
}