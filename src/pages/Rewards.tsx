
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Gift, 
  Zap, 
  Leaf, 
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from "sonner";

// Sample data
const rewards = [
  {
    id: '1',
    name: '15% Off Next Charge',
    description: 'Get 15% off your next charging session at any partner station.',
    points: 500,
    image: 'discount',
    category: 'Discount'
  },
  {
    id: '2',
    name: 'Free Coffee',
    description: 'Enjoy a free coffee at any partner café while charging your vehicle.',
    points: 300,
    image: 'coffee',
    category: 'Freebie'
  },
  {
    id: '3',
    name: 'Premium Subscription',
    description: '1 month free subscription to our premium route planning service.',
    points: 800,
    image: 'subscription',
    category: 'Subscription'
  },
  {
    id: '4',
    name: '$10 Store Credit',
    description: 'Get $10 credit to spend at the EV accessory store.',
    points: 600,
    image: 'credit',
    category: 'Credit'
  }
];

const leaderboard = [
  { id: '1', name: 'Alex Johnson', points: 2850, rank: 1, avatar: '' },
  { id: '2', name: 'Sam Rodriguez', points: 2420, rank: 2, avatar: '' },
  { id: '3', name: 'Taylor Smith', points: 2180, rank: 3, avatar: '' },
  { id: '4', name: 'Jordan Lee', points: 1950, rank: 4, avatar: '' },
  { id: '5', name: 'Casey Morgan', points: 1840, rank: 5, avatar: '' },
  { id: '6', name: 'You', points: 1650, rank: 6, avatar: '', isCurrentUser: true }
];

const activities = [
  { id: '1', type: 'Charging Completed', points: 50, date: '2h ago', icon: Zap },
  { id: '2', type: 'CO₂ Emissions Saved', points: 30, date: '1d ago', icon: Leaf },
  { id: '3', type: 'Weekly Challenge Completed', points: 100, date: '2d ago', icon: Trophy },
  { id: '4', type: 'Referred a Friend', points: 200, date: '1w ago', icon: Share2 }
];

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(1650);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  
  const categories = ['All', 'Discount', 'Freebie', 'Subscription', 'Credit'];
  
  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);
  
  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      toast.success(`You've redeemed: ${reward.name}`);
    } else {
      toast.error("You don't have enough points to redeem this reward");
    }
  };
  
  return (
    <div className="min-h-screen bg-ev-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold">Rewards & Gamification</h1>
          <p className="text-ev-text-light mt-1">
            Earn points, unlock rewards, and compete with other EV drivers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Points and Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="card-ev text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-ev-accent/10 rounded-full">
                  <Trophy className="h-8 w-8 text-ev-accent" />
                </div>
              </div>
              <h2 className="text-xl font-semibold">Your EV Points</h2>
              <div className="text-4xl font-bold text-ev-accent mt-2 mb-4">{userPoints}</div>
              <p className="text-ev-text-light text-sm">
                Keep charging with Smart<span className="text-ev-accent">EV</span> to earn more points!
              </p>
              <div className="flex justify-center mt-6">
                <Button className="btn-ev">
                  View Earning Opportunities
                </Button>
              </div>
            </Card>
            
            <Card className="card-ev">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Recent Activities</h2>
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>All</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                      <activity.icon className="h-5 w-5 text-ev-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{activity.type}</span>
                        <span className="text-ev-accent font-medium">+{activity.points}</span>
                      </div>
                      <div className="text-xs text-ev-text-light mt-0.5">{activity.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-4 text-ev-accent">
                <span>View All Activity</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Card>
          </motion.div>
          
          {/* Rewards & Leaderboard Tab Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex space-x-4">
              <Button 
                onClick={() => setShowLeaderboard(false)} 
                className={`flex-1 rounded-lg text-base font-medium py-2 ${!showLeaderboard ? 'btn-ev' : 'bg-white shadow-soft text-ev-text hover:bg-gray-50'}`}
              >
                <Gift className="h-5 w-5 mr-2" />
                <span>Rewards</span>
              </Button>
              <Button 
                onClick={() => setShowLeaderboard(true)} 
                className={`flex-1 rounded-lg text-base font-medium py-2 ${showLeaderboard ? 'btn-ev' : 'bg-white shadow-soft text-ev-text hover:bg-gray-50'}`}
              >
                <Trophy className="h-5 w-5 mr-2" />
                <span>Leaderboard</span>
              </Button>
            </div>
            
            {!showLeaderboard ? (
              <Card className="card-ev">
                <div className="flex overflow-x-auto pb-2 -mx-2 px-2 mb-6 scrollbar-none">
                  <div className="flex space-x-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        className={selectedCategory === category ? 'bg-ev-accent text-white border-ev-accent hover:bg-ev-accent-dark' : ''}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRewards.map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="card-ev hover:border-ev-accent h-full">
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-ev-text-light">
                            {reward.category}
                          </div>
                          <div className="flex items-center text-ev-accent font-semibold">
                            <Zap className="h-4 w-4 mr-1" />
                            {reward.points} pts
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-1.5">{reward.name}</h3>
                        <p className="text-sm text-ev-text-light mb-4">
                          {reward.description}
                        </p>
                        
                        <div className="mt-auto">
                          <Button 
                            onClick={() => handleRedeemReward(reward)}
                            className={userPoints >= reward.points ? 'btn-ev w-full' : 'bg-gray-100 text-ev-text-light w-full cursor-not-allowed'}
                            disabled={userPoints < reward.points}
                          >
                            {userPoints >= reward.points ? 'Redeem Reward' : 'Not Enough Points'}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="card-ev">
                <h2 className="text-lg font-medium mb-6">Top EV Drivers This Month</h2>
                
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? 'bg-ev-accent/5 border border-ev-accent/20' : ''}`}
                    >
                      <div className="w-8 flex justify-center font-bold text-lg mr-4">
                        {user.rank}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-xs bg-ev-accent text-white px-1.5 py-0.5 rounded">You</span>
                          )}
                        </div>
                        <div className="text-sm text-ev-text-light">Level {Math.floor(user.points / 500) + 1}</div>
                      </div>
                      <div className="font-semibold text-lg">{user.points}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-ev-text-light">Your Current Rank</div>
                      <div className="font-medium text-ev-text">#6 of 124 users</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-ev-accent">
                      <Share2 className="h-4 w-4 mr-1.5" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
                
                <Button variant="link" className="w-full mt-4 text-ev-accent">
                  <span>View Full Leaderboard</span>
                  <ExternalLink className="h-4 w-4 ml-1.5" />
                </Button>
              </Card>
            )}
            
            <Card className="card-ev bg-gradient-to-r from-blue-50 to-green-50 border-none">
              <div className="flex items-center">
                <div className="mr-6">
                  <Leaf className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">Environmental Impact</h3>
                  <p className="text-ev-text-light">
                    Your EV usage has saved 384kg of CO₂ emissions this year, equivalent to planting 17 trees.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 ml-4">
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
