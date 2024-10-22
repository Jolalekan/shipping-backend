const mongoose = require("mongoose")
const { Schema } = mongoose;

const trackingSchema = new Schema({
    dateOfShipping: { type: Date, required: true },
    dateOfDelivery: { type: Date, required: true },
    senderCountry: { type: String, required: true },
    receiverCountry: { type: String, required: true },
    receiverName:{ type: String, required: true },
    receiverSurname:{ type: String, required: true },
    sendAddress: { type: String, required: true },
    sendState:{ type: String, required: true },
    senderCity:{ type: String, required: true },
    receiverCity:{ type: String, required: true },        
    receiverPhone:{ type: String, required: true },
    receivePostCode:{ type: String, required: true },
    receiveAddress: { type: String, required: true },
    receiveState:{ type: String, required: true },
    sendPostCode:{ type: String, required: true },
    senderPhone: { type: String, required: true },
    qty: { type: String, required: true },
    content: { type: String, required: true },
    service: { type: String, required: true },
    weight: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    details: { type: String, required: true },
    activities: { type: String, required: true },
    trackingNumber: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },

    // dateHistory: [
    //     {
    //         value: { type: Date, required: true },
    //         updatedAt: { type: Date, default: Date.now },
    //     },
    // ],

    // locationHistory: [
    //     {
    //         value: { type: String, required: true },
    //         updatedAt: { type: Date, default: Date.now },
    //     },
    // ],

    // activitiesHistory: [
    //     {
    //         value: { type: String, required: true },
    //         updatedAt: { type: Date, default: Date.now },
    //     },
    // ],
    // detailsHistory: [
    //     {
    //         value: { type: String, required: true },
    //         updatedAt: { type: Date, default: Date.now },
    //     },
    // ],


    updatedAt:{type:Date, default: Date.now},
    
    
    history: [
        {
            type: {
                type: String, // "date", "activities", "location", "details"
                required: true,
            },
            value: { type: String, required: true },
            updatedAt: { type: Date, default: Date.now },
        },
    ],
})

const Tracking = mongoose.model("Tracking", trackingSchema)

module.exports = Tracking