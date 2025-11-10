import NavigationBar from '../components/NavigationBar.jsx';
import WelcomeSection from '../components/WelcomeSection.jsx';
import MoodTrackerPreview from '../components/MoodTrackerPreview.jsx';
import QuoteOfTheDay from '../components/QuoteOfTheDay.jsx';
import ShortcutCards from '../components/ShortcutCards.jsx';
import MoodTrendGraph from '../components/MoodTrendGraph.jsx';
import AccreditationSection from '../components/AccreditationSection.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-10">
          
          {/* Welcome Section */}
          <section className="text-center sm:text-left">
            <WelcomeSection />
          </section>

          {/* Mood Tracker + Graph */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <MoodTrackerPreview />
            <MoodTrendGraph />
          </section>

          {/* Quote */}
          <section className="px-2 sm:px-4">
            <QuoteOfTheDay />
          </section>

          {/* Shortcuts */}
          <section>
            <ShortcutCards />
          </section>

          {/* Accreditation Section */}
          <section>
            <AccreditationSection />
          </section>
        </div>
      </main>
    </div>
  );
}
