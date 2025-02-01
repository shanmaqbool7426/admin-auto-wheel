import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import { Grid, Box, Checkbox, Text, Group, Loader } from '@mantine/core';
import CustomButton from '@/components/CustomButton';
import { useUpdateRoleMutation } from '@/services/roles';
import useAddUser from './useAddUser';
import { notifications } from '@mantine/notifications';


export default function UpdateRole({ isOpen, setIsOpen }) {
  const { roles, isRolesLoading } = useAddUser();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [localPermissions, setLocalPermissions] = useState({});

  // Initialize permissions when roles data loads
  useEffect(() => {
    if (roles?.data?.roles?.[0]?.permissions) {
      setLocalPermissions(roles.data.roles[0].permissions);
    }
  }, [roles]);

  const handlePermissionChange = (e, permission, type) => {
    if (!permission || !type) return;
  
    setLocalPermissions(prev => ({
      ...prev,
      [permission]: {
        ...(prev[permission] || {}), // Provide default empty object
        [type]: Boolean(e?.currentTarget?.checked) // Ensure boolean value
      }
    }));
  };
  

  const handleSubmitRoles = async (e) => {
    console.log('Form submitted:', localPermissions);
    e.preventDefault();
    try {
      const roleId = roles?.data?.roles?.[0]?._id;
      console.log('Role ID:', roleId);
      if (!roleId) throw new Error('Role ID not found');

      await updateRole({
        id: roleId,
        data: { permissions: localPermissions }
      }).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Role updated successfully',
        color: 'green',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update role',
        color: 'red',
      });
    }

  };

  useEffect(() => {
    if (roles?.data?.roles?.[0]?.permissions) {
      const initialPermissions = {};
      Object.entries(roles.data.roles[0].permissions).forEach(([key, value]) => {
        initialPermissions[key] = {
          access: value?.access || false,
          edit: value?.edit || false,
          readOnly: value?.readOnly || false
        };
      });
      setLocalPermissions(initialPermissions);
    }
  }, [roles]);

   const generateUniqueKey = (prefix, index) => {
    return `${prefix}_${index}_${Date.now()}`;
  };

  if (isRolesLoading || !localPermissions) {
    return (
      <CustomModal
        title="Update Administrator Role"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size='762'
      >
        <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader />
        </Box>
      </CustomModal>
    );
  }

  return (
    <CustomModal
      title="Update Administrator Role"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      size='762'
    >
      <form onSubmit={handleSubmitRoles}>
        {roles?.data?.roles?.map((role, roleIndex) => (
          <Box key={generateUniqueKey('role', roleIndex)} mt="md">
            <Text size="lg" weight={500} mb="md">{role.name}</Text>
            
            <Grid mb="xs">
              <Grid.Col span={4}>
                <Text weight={500}>Permission</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Group position="left" spacing="xl">
                  <Text size="sm" weight={500}>Access</Text>
                  <Text size="sm" weight={500}>Edit</Text>
                  <Text size="sm" weight={500}>Read Only</Text>
                </Group>
              </Grid.Col>
            </Grid>

            {Object.entries(localPermissions).map(([permission, values], index) => (
              <Grid key={index} py="xs" style={{ 
                borderBottom: '1px solid #eee',
                alignItems: 'center'
              }}>
                <Grid.Col span={4}>
                  <Text transform="capitalize">
                    {permission.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Group position="left" spacing="xl">
                    <Checkbox
                      checked={values?.access || false}
                      onChange={(e) => handlePermissionChange(e, permission, 'access')}
                      size="sm"
                    />
                    <Checkbox
                      checked={values?.edit || false}
                      onChange={(e) => handlePermissionChange(e, permission, 'edit')}
                      size="sm"
                    />
                    <Checkbox
                      checked={values?.readOnly || false}
                      onChange={(e) => handlePermissionChange(e, permission, 'readOnly')}
                      size="sm"
                    />
                  </Group>
                </Grid.Col>
              </Grid>
            ))}
          </Box>
        ))}

        <Box mt="xl" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <CustomButton 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isUpdating}
          >
            Cancel
          </CustomButton>
          <CustomButton 
            color='#1B84FF' 
            type='submit'
            loading={isUpdating}
          >
            Update Permissions
          </CustomButton>
        </Box>
      </form>
    </CustomModal>
  );
}