import React, { useState } from 'react';
import { Election, Vote } from '../types';
import { Vote as VoteIcon } from 'lucide-react';

interface VoterDashboardProps {
  userId: string;
}

export default function VoterDashboard({ userId }: VoterDashboardProps) {
  const [elections, setElections] = useState<Election[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);

  const handleVote = (electionId: string, candidateId: string) => {
    if (votes.some(v => v.electionId === electionId && v.voterId === userId)) {
      alert('You have already voted in this election');
      return;
    }

    const newVote: Vote = {
      id: Math.random().toString(36).substr(2, 9),
      electionId,
      candidateId,
      voterId: userId,
      timestamp: new Date().toISOString()
    };

    setVotes([...votes, newVote]);

    // Update candidate vote count
    setElections(elections.map(election => {
      if (election.id === electionId) {
        return {
          ...election,
          candidates: election.candidates.map(candidate => {
            if (candidate.id === candidateId) {
              return { ...candidate, voteCount: candidate.voteCount + 1 };
            }
            return candidate;
          })
        };
      }
      return election;
    }));
  };

  const getActiveElections = () => {
    const now = new Date();
    return elections.filter(election => {
      const startDate = new Date(election.startDate);
      const endDate = new Date(election.endDate);
      return now >= startDate && now <= endDate;
    });
  };

  const hasVoted = (electionId: string) => {
    return votes.some(vote => vote.electionId === electionId && vote.voterId === userId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Active Elections</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {getActiveElections().map(election => (
          <div key={election.id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900">{election.title}</h3>
            <p className="mt-2 text-gray-600">{election.description}</p>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Start Date:</span>
                <span className="text-gray-900">{new Date(election.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">End Date:</span>
                <span className="text-gray-900">{new Date(election.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            {hasVoted(election.id) ? (
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <p className="text-green-700">Thank you for voting in this election!</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Candidates</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {election.candidates.map(candidate => (
                    <div
                      key={candidate.id}
                      className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="text-lg font-medium text-gray-900">
                          {candidate.name}
                        </h5>
                        <button
                          onClick={() => handleVote(election.id, candidate.id)}
                          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                          <VoteIcon className="w-4 h-4 mr-2" />
                          Vote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {getActiveElections().length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No active elections at the moment</p>
        </div>
      )}
    </div>
  );
}