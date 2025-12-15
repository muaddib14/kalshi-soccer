import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, TrendingUp, CircleDot } from 'lucide-react';
import { Card } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { type Fixture } from '@/lib/data/fixtures';

interface FixtureCardProps {
  fixture: Fixture;
  onPredict?: (fixture: Fixture) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onPredict }) => {
  const isLive = fixture.status === 'LIVE' || fixture.status === 'PAUSED';
  const isFinished = fixture.status === 'FINISHED';

  // Helper to render logo or placeholder
  const TeamLogo = ({ name, url }: { name: string; url?: string }) => (
    <div className="relative w-12 h-12 mb-2 flex items-center justify-center bg-slate-100 rounded-full overflow-hidden border border-slate-200">
      {url ? (
        <Image 
          src={url} 
          alt={name} 
          fill 
          className="object-contain p-2"
          sizes="48px"
        />
      ) : (
        <span className="text-xs font-bold text-slate-400">
          {name.substring(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  );

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden group">
      {/* Header: Status Badge */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {isLive ? (
             <span className="flex items-center text-red-600 text-xs font-bold animate-pulse">
               <CircleDot className="w-3 h-3 mr-1" />
               LIVE {fixture.minute ? `'${fixture.minute}` : ''}
             </span>
          ) : (
            <span className="flex items-center text-slate-500 text-xs font-medium">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(fixture.date).toLocaleDateString()}
            </span>
          )}
        </div>
        {!isLive && !isFinished && (
          <div className="flex items-center text-slate-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center w-1/3 text-center">
            <TeamLogo name={fixture.homeTeam.name} url={fixture.homeTeam.logo} />
            <span className="font-bold text-slate-900 text-sm md:text-base leading-tight">
              {fixture.homeTeam.name}
            </span>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center justify-center w-1/3">
            {isLive || isFinished ? (
              <div className="text-3xl font-bold text-slate-900 tracking-wider">
                {fixture.homeTeam.score} - {fixture.awayTeam.score}
              </div>
            ) : (
              <span className="text-slate-400 font-bold text-xl bg-slate-100 px-3 py-1 rounded">VS</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center w-1/3 text-center">
             <TeamLogo name={fixture.awayTeam.name} url={fixture.awayTeam.logo} />
            <span className="font-bold text-slate-900 text-sm md:text-base leading-tight">
              {fixture.awayTeam.name}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {fixture.venue && (
            <div className="flex items-center justify-center text-xs text-slate-500">
              <MapPin className="w-3 h-3 mr-1" />
              {fixture.venue}
            </div>
          )}

          {/* PREDICT BUTTON - Only show for Scheduled or Live matches */}
          {!isFinished && (
            <Button 
              variant="outline" 
              // UPDATED: Outline button with emerald border and text, filled emerald on hover
              className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-black transition-all duration-300"
              onClick={() => onPredict?.(fixture)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Get AI Prediction
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FixtureCard;