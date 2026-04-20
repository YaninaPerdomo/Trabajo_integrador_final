import Event from '../models/Event.js';

class EventRepository {
    async findAllByUser(userId) {
        return await Event.find({ user: userId }).populate('category');
    }

    async findById(id) {
        return await Event.findById(id).populate('category');
    }

    async create(eventData) {
        return await Event.create(eventData);
    }

    async update(id, eventData) {
        return await Event.findByIdAndUpdate(id, eventData, {
            new: true,
            runValidators: true
        });
    }

    async delete(id) {
        return await Event.findByIdAndDelete(id);
    }
}

export default new EventRepository();
