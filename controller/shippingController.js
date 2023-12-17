const trackingService = require("../service/trackingService")

const submitShipping = async (req, res) => {
    try {
        console.log('Received shipping request:', req.body);

        const { dateOfShipping,
            dateOfDelivery,
            country,
            sender,
            receiver,
            sendAddress,
            receiveAddress,
            no,
            qty,
            content,
            service,
            weight,
            date,
            activities,
            location,
            details

        } = req.body.formData;
        const trackingNumber = trackingService.generateUniqueTrackingNumber();

        const result = await trackingService.saveTrackingInfo(trackingNumber, {
            dateOfShipping,
            dateOfDelivery,
            country,
            sender,
            receiver,
            sendAddress,
            receiveAddress,
            no,
            qty,
            content,
            service,
            weight,
            date,
            activities,
            location,
            details
        });

        console.log('Shipping info saved. Response:', result);
        res.json(result);
    } catch (error) {
        console.error('Error submitting shipping:', error);
        res.status(500).json({ error: error.message });
    }
};

const shipList = async(req, res)=>{

    try {
            const shipping = await trackingService.getShippingList()
            res.json(shipping)

    } catch (error) {
        console.error("Error fetching shipping info", error)
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    submitShipping,
    shipList
};