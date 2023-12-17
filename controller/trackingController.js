const trackingService = require("../service/trackingService")

const trackGoods = async (req, res) => {

    const trackingNumber = req.params.trackingNumber
    try {
        const shipment = await trackingService.trackGoods(trackingNumber)
        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" })
        }

        res.json(shipment)
    } catch (error) {
        console.error("Error tracking good", error)
        res.status(500).json({ error: error.message })
    }
}

const editTrackingInfo = async (req, res) => {
    const trackingNumber = req.params.trackingNumber
    const updateInfo = req.body
    try {
        const updateShipment = await trackingService.editTrackingInfo(trackingNumber, updateInfo)
        if (!updateShipment) {
            return res.status(404).json({ message: "shipment not found" })
        }
        res.json(updateShipment)
    } catch (error) {
        console.error("Error updating tracking information")
        res.status(500).json({ error: error.message })
    }
}

const trackingLogin = async (req, res) => {
    const { trackingNumber } = req.body
    try {
        const tracking = await trackingService.trackLog(trackingNumber)
        if (tracking) {
            res.status(200).json({ message: "tracking successful", tracking })
        } else {
            res.status(401).json({ message: "invalid credentials" })
        }
    } catch (error) {
        console.error('Error during login')
        res.status(500).json({ message: error.message })
    }
}

const deletingTracking = async (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    try {
        const deletedTracking = await trackingService.deleteTrack(trackingNumber);
        if (deletedTracking) {
            return res.status(200).json({ message: "Successfully deleted", deletedTracking });
        } else {
            return res.status(404).json({ message: `Tracking with number ${trackingNumber} not found for deletion` });
        }
    } catch (error) {
        console.error("Error in deleteTracking controller", error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    trackGoods,
    editTrackingInfo,
    trackingLogin,
    deletingTracking
}