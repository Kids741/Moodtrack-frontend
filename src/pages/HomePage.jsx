import NavigationBar from '../components/NavigationBar.jsx';
import WelcomeSection from '../components/WelcomeSection.jsx';
import MoodTrackerPreview from '../components/MoodTrackerPreview.jsx';
import JournalPreview from '../components/JournalPreview.jsx';
import QuoteOfTheDay from '../components/QuoteOfTheDay.jsx';
import ShortcutCards from '../components/ShortcutCards.jsx';


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <WelcomeSection />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MoodTrackerPreview />
            <JournalPreview />
          </div>
          
          <QuoteOfTheDay />
          
          <ShortcutCards />
        </div>
      </main>
    </div>
  );
}
