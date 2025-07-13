import { Schema, model  } from 'mongoose';

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'INR' ],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['entertainment', 'news', 'sports', 'politics', 'finance', 'technology', 'lifestyle', 'others'],
        required: [true, 'Subscription category is required']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'startDate is required'],
        validate: {
            validator: function(v) { return v <= Date.now() },
            message: 'startDate must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(v) { return v > this.startDate },
            message: 'renewalDate must be after the startDate'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status =  'expired';
    }

    next();
});

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;