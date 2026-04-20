import eventService from '../services/EventService.js';

class EventController {
    async getEvents(req, res) {
        try {
            const events = await eventService.getEvents(req.user.id);
            res.status(200).json({
                success: true,
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getEvent(req, res) {
        try {
            const event = await eventService.getEventById(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                data: event
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async createEvent(req, res) {
        try {
            const event = await eventService.createEvent(req.body, req.user.id);
            res.status(201).json({
                success: true,
                message: 'Evento creado con éxito',
                data: event
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateEvent(req, res) {
        try {
            const event = await eventService.updateEvent(req.params.id, req.body, req.user.id);
            res.status(200).json({
                success: true,
                message: 'Evento actualizado con éxito',
                data: event
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteEvent(req, res) {
        try {
            await eventService.deleteEvent(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                message: 'Evento eliminado con éxito'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new EventController();
