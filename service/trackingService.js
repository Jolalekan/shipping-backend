const Tracking = require("../model/Tracking");


function generateUniqueTrackingNumber() {
    const min = Math.pow(10, 10);
    const max = Math.pow(10, 11) - 1;

    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

    return String(randomInteger);
}
generateUniqueTrackingNumber();


const saveTrackingInfo = async (trackingNumber, shippingInfo) => {
    const trackingDocument = new Tracking({
        ...shippingInfo,
        trackingNumber,
    });

    try {
        await trackingDocument.save();
       
        return { trackingNumber };
    } catch (err) {
        if (err.name === "ValidationError") {
            console.error("Validation error:", err.errors);
            throw new Error("Validation error");
        }
        else {
            console.error("Error saving shipping document", err);
            throw new Error("Internal server error")
        }
    }
};

//function for getting shipping list
const getShippingList = () => {
    try {
        return Tracking.find()
    } catch (error) {
        console.error("Error fetching shipping info", error.message)
        throw new Error("Internal server error")
    }
}

//configuration for tracking goods
const trackGoods = async (trackingNumber) => {
    try {
        const shipment = await Tracking.findOne({ trackingNumber })

        return shipment || null
    } catch (error) {
        console.error("Error tracking goods", error)
        throw new Error("Internal server error")
    }
}

//Configuration for editing Tracking information
const editTrackingInfo = async (trackingNumber, updateInfo) => {
    try {
        const existingShipment = await Tracking.findOne(
            { trackingNumber }
        )


        if (!existingShipment) {
            return null
        }

        const commonUpdatedAt = new Date();

        if (!existingShipment.commonHistory) {
            existingShipment.commonHistory = [];
        }

        if (updateInfo.date) {
            existingShipment.date = updateInfo.date;
        }

        if (updateInfo.activities) {
            existingShipment.activities = updateInfo.activities;
        }

        if (updateInfo.location) {
            existingShipment.location = updateInfo.location;
        }

        if (updateInfo.details) {
            existingShipment.details = updateInfo.details;
        }

        // Update common history
        existingShipment.commonHistory.push({
            type: 'common',
            value: 'Update occurred',
            updatedAt: commonUpdatedAt,
        });
        const updatedShipment = await existingShipment.save();

        return updatedShipment;

    } catch (error) {
        console.error("Error editing tracking information", error)
        throw new Error("Internal server error")
    }
}



const trackLog = async (trackingNumber) => {
    try {
        const tracking = await Tracking.findOne({ trackingNumber })
        if (tracking) {
            return tracking
        } else {
            return null
        }
    } catch (error) {
        console.error("Error tracking goods")
        throw error
    }
}

const deleteTrack = async (trackingNumber) => {
    try {
        const delTracking = await Tracking.findOneAndDelete(trackingNumber)
        if (!delTracking) {
            throw new Error("Document not found for deletion")
        }
        return delTracking
    } catch (error) {
        console.error("Error deleting tracking numb", error)
        throw error
    }
}

module.exports = {
    generateUniqueTrackingNumber,
    saveTrackingInfo,
    trackGoods,
    editTrackingInfo,
    trackLog,
    getShippingList,
    deleteTrack
};