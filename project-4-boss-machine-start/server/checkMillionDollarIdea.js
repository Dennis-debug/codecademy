const checkMillionDollarIdea = () => {
    const possibleMillion = req.body.numWeeks + req.body.weeklyRevenue;
    if (possibleMillion < 1000000) {
        return null;
    } else {
        return req.body;
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
