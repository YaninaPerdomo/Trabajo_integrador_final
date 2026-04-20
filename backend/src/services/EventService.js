import eventRepository from '../repositories/EventRepository.js';

class EventService {
    async getEvents(userId) {
        return await eventRepository.findAllByUser(userId);
    }

    async getEventById(id, userId) {
        const event = await eventRepository.findById(id);
        if (!event || event.user.toString() !== userId) {
            throw new Error('Evento no encontrado o acceso no autorizado');
        }
        return event;
    }

    async createEvent(eventData, userId) {
        return await eventRepository.create({
            ...eventData,
            user: userId
        });
    }

    async updateEvent(id, eventData, userId) {
        await this.getEventById(id, userId);
        return await eventRepository.update(id, eventData);
    }

    async deleteEvent(id, userId) {
        await this.getEventById(id, userId);
        return await eventRepository.delete(id);
    }
}

export default new EventService();
