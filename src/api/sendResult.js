export const sendResultApi = async (firstField, secondField, isWon, attempt) => {
    const url = '/rock-block';
    const body = {
        selectedNumber: {
            firstField,
            secondField
        },
        isTicketWon: isWon
    };
    const response = await  fetch(url,{
        method:'POST',
        body: JSON.stringify(body)
    });

    if (attempt < 3) {
        const newAttempt = attempt + 1
        return setTimeout(() => {
            sendResultApi(firstField, secondField, isWon, newAttempt);
        }, 2000);
    }

    if (response.status !== 200) return alert(`Что-то пошло не так и запрос не прошел. Ошибка ${response.status}`);

    return alert(`Запрос отправлен`);
};