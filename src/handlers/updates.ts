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
        // handle this

        res.json({
            data: null
        })

        return;
    };

    const update = await prisma.update.create({
        data: {
            ...req.body
        }
    });


    res.json({data: update});
}


// UPDATE update

export const updateUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id
        }
    });

    if(!product) {
        // handle this

        res.json({
            data: null
        })

        return;
    };

    // const match = product.find()

    const updatedUpdate = prisma.update.update({
        where: {
            id: req.body.id
        },
        data: {
            ...req.body
        }
    })
}

// DELETE update

