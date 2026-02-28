import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="contact-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-charcoal/70 ml-1">
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-teal-500/10 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all placeholder:text-charcoal/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-charcoal/70 ml-1">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-teal-500/10 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all placeholder:text-charcoal/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-charcoal/70 ml-1">
                                Subject
                            </label>
                            <input
                                required
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                className="w-full px-5 py-4 rounded-2xl bg-white border border-teal-500/10 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all placeholder:text-charcoal/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-charcoal/70 ml-1">
                                Message
                            </label>
                            <textarea
                                required
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us about your project..."
                                className="w-full px-5 py-4 rounded-2xl bg-white border border-teal-500/10 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all placeholder:text-charcoal/20 resize-none"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-4 px-6 bg-charcoal text-white font-bold rounded-2xl hover:bg-charcoal/90 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 px-6 text-center bg-emerald-50 rounded-3xl border border-emerald-100"
                    >
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-emerald-200">
                            ✓
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal mb-2">Message Sent!</h3>
                        <p className="text-charcoal/60 max-w-[280px]">
                            Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-8 text-emerald-600 font-semibold hover:underline"
                        >
                            Send another message
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactForm;
