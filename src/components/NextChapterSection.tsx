import React from 'react';
import { AuthorProfile } from '../types/portfolio';
import { Coffee, Mail, Linkedin, Github, Twitter, Compass, Sparkles } from 'lucide-react';

interface NextChapterSectionProps {
  profile: AuthorProfile;
  onOpenCoffeeModal: () => void;
}

export const NextChapterSection: React.FC<NextChapterSectionProps> = ({
  profile,
  onOpenCoffeeModal,
}) => {
  return (
    <section id="contact" className="py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Section 05 · The Horizon
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-editorial font-medium text-stone-900">
            The Next Chapter & Staying in Touch
          </h2>
          <p className="text-base text-stone-600 mt-2 leading-relaxed">
            While my daily pull requests at {profile.company} will come to a close on {profile.lastWorkingDay}, friendships and ideas don't have an expiration date.
          </p>
        </div>

        {/* 2-Column Split: Future Bio on Left, Connect Actions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: What's Next */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs font-mono-code mb-4">
                <Compass className="w-4 h-4 text-stone-600" />
                <span>WHAT'S NEXT</span>
              </div>

              <h3 className="text-2xl font-serif-editorial font-medium text-stone-900 mb-4">
                {profile.nextChapterHeadline}
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {profile.nextChapterBio}
              </p>

              {/* Parting Engineering Rules */}
              <div className="pt-6 border-t border-stone-100">
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
                  My 3 Non-Negotiable Engineering Laws for the Team:
                </div>
                <ul className="text-xs text-stone-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-900 font-bold">1.</span>
                    <span>Never merge a large migration on a Friday afternoon unless you love cold emergency pizza.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-900 font-bold">2.</span>
                    <span>Write code for the next engineer who joins in 6 months with zero context.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-900 font-bold">3.</span>
                    <span>Be extraordinarily generous with praise and ruthlessly constructive with technical feedback.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Farewell Coffee & Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Farewell Coffee Card */}
            <div className="p-7 bg-stone-900 text-white rounded-2xl flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center mb-4">
                  <Coffee className="w-5 h-5 text-stone-200" />
                </div>
                <h4 className="text-xl font-serif-editorial font-medium mb-2">
                  Grab a Farewell Coffee
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed mb-6">
                  Before my final day on {profile.lastWorkingDay}, I’ve set aside slots for 15-minute farewell coffees, walks, or remote Zoom catch-ups.
                </p>
              </div>

              <button
                onClick={onOpenCoffeeModal}
                className="w-full py-3 px-4 text-xs font-medium text-stone-950 bg-white hover:bg-stone-100 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Book a 15-min Catch-up</span>
              </button>
            </div>

            {/* Direct Connect Links */}
            <div className="p-6 bg-white border border-stone-200 rounded-2xl">
              <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">
                Personal Contact Channels
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span className="truncate">Email Me</span>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-stone-500" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-stone-500" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5 text-stone-500" />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
