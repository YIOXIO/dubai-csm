export class TotalHoursData {
    constructor() {
        this.total = 1080; // Фиксированное значение
        this.current = 990; // Текущее значение
    }

    updateData(newCurrent) {
        this.current = newCurrent;
        return this;
    }

    // Получить данные
    getData() {
        return {
            total: this.total,
            current: this.current,
            percentage: Math.min(100, Math.round((this.current / this.total) * 100))
        };
    }
}

// Экспортируем экземпляр по умолчанию
export const totalHours = new TotalHoursData();