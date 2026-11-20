import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DistortedText } from './DistortedText';

type InquiryType = 'Live Booking' | 'Feature & Studio' | 'Brand Partnership';

export function ConnectSection() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('Live Booking');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inquiryOptions: InquiryType[] = [
    'Live Booking',
    'Feature & Studio',
    'Brand Partnership',
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@') || !message.trim()) {
      setError('Please enter your name, a valid email address, and brief project details.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCity('');
    setMessage('');
  };

  return (
    <section id="connect" className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left editorial statement */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-wide text-[#B8BDC7]">
              03. Connect
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-5xl md:text-6xl leading-[1.02] text-balance">
              <DistortedText text="Let's create something" accentDot />
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#B8BDC7]">
              Bookings, live festival routing, studio collaborations, and selective brand partnerships across South Asia and international stages.
            </p>

            <div className="mt-10 space-y-6 border-t border-white/10 pt-8 text-sm">
              <div>
                <div className="text-xs text-[#8E939E]">Management & Bookings</div>
                <a
                  href="mailto:bookings@yabimusic.com"
                  className="mt-1 inline-flex items-center gap-1.5 font-medium text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors"
                >
                  <span>bookings@yabimusic.com</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div>
                <div className="text-xs text-[#8E939E]">Base & Routing</div>
                <p className="mt-1 text-[#F4F2EE]">
                  Kathmandu · Dhangadhi · International
                </p>
              </div>
            </div>
          </div>

          {/* Right interactive inquiry form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8 md:p-10">
              {submitted ? (
                <div className="py-10 text-left space-y-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FF1E2D]/15 text-[#FF1E2D]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F4F2EE]">
                    Inquiry received for {inquiryType}.
                  </h3>
                  <p className="max-w-lg text-sm leading-relaxed text-[#B8BDC7]">
                    Thank you, {name}. YABI’s management team has logged your request from {city || 'your location'} and will respond to {email} within 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-[#F4F2EE] hover:border-white/40 transition-colors cursor-pointer min-h-[44px]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label className="block text-xs font-medium text-[#B8BDC7] mb-3">
                      Inquiry Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setInquiryType(option)}
                          className={`rounded-md px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[40px] ${
                            inquiryType === option
                              ? 'bg-[#FF1E2D] text-[#FAFAFA]'
                              : 'border border-white/15 bg-transparent text-[#B8BDC7] hover:border-white/30 hover:text-[#F4F2EE]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="connect-name" className="block text-xs font-medium text-[#B8BDC7] mb-2">
                        Name or Organization
                      </label>
                      <input
                        id="connect-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav Shrestha / Soundwave Live"
                        className="w-full rounded-md border border-white/15 bg-[#050505] px-4 py-3 text-sm text-[#F4F2EE] placeholder-[#6B707B] focus:border-[#FF1E2D] focus:outline-none min-h-[44px]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="connect-email" className="block text-xs font-medium text-[#B8BDC7] mb-2">
                        Email Address
                      </label>
                      <input
                        id="connect-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="team@festival.com"
                        className="w-full rounded-md border border-white/15 bg-[#050505] px-4 py-3 text-sm text-[#F4F2EE] placeholder-[#6B707B] focus:border-[#FF1E2D] focus:outline-none min-h-[44px]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="connect-city" className="block text-xs font-medium text-[#B8BDC7] mb-2">
                      City / Venue / Timeline (Optional)
                    </label>
                    <input
                      id="connect-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Kathmandu · Spring 2027"
                      className="w-full rounded-md border border-white/15 bg-[#050505] px-4 py-3 text-sm text-[#F4F2EE] placeholder-[#6B707B] focus:border-[#FF1E2D] focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="connect-message" className="block text-xs font-medium text-[#B8BDC7] mb-2">
                      Project Brief
                    </label>
                    <textarea
                      id="connect-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share event dates, creative direction, or collaboration concept..."
                      className="w-full rounded-md border border-white/15 bg-[#050505] px-4 py-3 text-sm text-[#F4F2EE] placeholder-[#6B707B] focus:border-[#FF1E2D] focus:outline-none"
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#FF1E2D]">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-[#8E939E]">
                      Direct response from YABI Management
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-md bg-[#FF1E2D] px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#E01524] cursor-pointer min-h-[44px]"
                    >
                      <span>Send Inquiry</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
