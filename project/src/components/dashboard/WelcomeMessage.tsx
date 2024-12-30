import React from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useOrganization } from '../../hooks/useOrganization';

export function WelcomeMessage() {
  const { user } = useCurrentUser();
  const { organization, isLoading } = useOrganization(user?.organization_id);

  if (!user?.organization_id || !organization?.welcome_message || isLoading) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div 
        className="prose prose-sm max-w-none text-gray-600"
        dangerouslySetInnerHTML={{ __html: organization.welcome_message }}
      />
    </div>
  );
}