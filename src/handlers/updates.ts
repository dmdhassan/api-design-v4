import prisma from "../db";


// GET one update
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })

    
    res.json({data: update})
}



// GET all

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = await products.reduce((updates, product) => {
        return [...updates, ...product.updates]
    }, [])

    res.json({data: updates})
}


// CREATE update

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id
        }
    });

    if(!product) {
        // There is no product or product does not belong to user

        res.json({
            data: ({
                message: "product does not exist",
                data: null
            })
        })

        return;
    };

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    });


    res.json({
        data: update
    });
}


// UPDATE update

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, [])

    const match = updates.find(update => {
        return update.id === req.params.id
    })

    if (!match) {
        return res.json({
            message: "no update to update"
        })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: {
            ...req.body
        }
    })


    res.json({
        data: updatedUpdate
    })
}


// DELETE update

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        }, 
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => {
        return update.id === req.params.id
    })

    if (!match) {
        return res.json({
            message: "nothing to delete"
        })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    return res.json({
        data: deleted
    })
}