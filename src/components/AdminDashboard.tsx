import React, { useState } from 'react';
import { Election, Candidate } from '../types';
import { PlusCircle, BarChart3, Users, Calendar } from 'lucide-react';

interface AddElectionModalProps {
  onClose: () => void;
  onAdd: (election: Election) => void;
}

function AddElectionModal({ onClose, onAdd }: AddElectionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [candidates, setCandidates] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const election: Election = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      startDate,
      endDate,
      isActive: new Date(startDate) <= new Date() && new Date(endDate) >= new Date(),
      candidates: candidates.filter(name => name.trim()).map(name => ({
        id: Math.random().toString(36).substr(2, 9),
        name,
        electionId: '',
        voteCount: 0
      })),
      votes: []
    };
    election.candidates.forEach(candidate => {
      candidate.electionId = election.id;
    });
    onAdd(election);
  };

  const addCandidateField = () => {
    setCandidates([...candidates, '']);
  };

  const updateCandidate = (index: number, value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Election</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Candidates</label>
            {candidates.map((candidate, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  required
                  value={candidate}
                  onChange={(e) => updateCandidate(index, e.target.value)}
                  placeholder={`Candidate ${index + 1}`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCandidateField}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-900"
            >
              + Add another candidate
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Create Election
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [elections, setElections] = useState<Election[]>([]);
  const [showAddElection, setShowAddElection] = useState(false);

  const addElection = (election: Election) => {
    setElections([...elections, election]);
    setShowAddElection(false);
  };

  const getElectionStatus = (election: Election) => {
    const now = new Date();
    const start = new Date(election.startDate);
    const end = new Date(election.endDate);

    if (now < start) return 'Upcoming';
    if (now > end) return 'Ended';
    return 'Active';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Elections</h2>
          <button
            onClick={() => setShowAddElection(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Add Election
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => (
            <div
              key={election.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900">{election.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{election.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Start Date:</span>
                  <span className="text-gray-900">{new Date(election.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">End Date:</span>
                  <span className="text-gray-900">{new Date(election.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  getElectionStatus(election) === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : getElectionStatus(election) === 'Upcoming'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {getElectionStatus(election)}
                </span>
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {/* View results */}}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Candidates:</h4>
                <ul className="mt-2 space-y-1">
                  {election.candidates.map((candidate) => (
                    <li key={candidate.id} className="text-sm text-gray-600 flex justify-between">
                      <span>{candidate.name}</span>
                      <span className="font-medium">{candidate.voteCount} votes</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddElection && (
        <AddElectionModal
          onClose={() => setShowAddElection(false)}
          onAdd={addElection}
        />
      )}
    </div>
  );
}