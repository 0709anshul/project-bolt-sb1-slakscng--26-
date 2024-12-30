import React, { useState } from 'react';
import { X, Truck, Calendar, Package2 } from 'lucide-react';
import { useUpdateMaterialOrder } from '../../../hooks/inventory/useUpdateMaterialOrder';
import { ORDER_STATUSES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { formatDate } from '../../../utils/date';
import type { MaterialOrder } from '../../../types/inventory';

type MaterialOrderDetailsProps = {
  order: MaterialOrder;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function MaterialOrderDetails({ order, isOpen, onClose, onUpdate }: MaterialOrderDetailsProps) {
  const { updateOrder, isLoading, error } = useUpdateMaterialOrder();
  const [formData, setFormData] = useState({
    status: order.status,
    dispatch_date: order.dispatch_date || '',
    arrival_date: order.arrival_date || '',
    waybill_details: order.waybill_details || {
      number: '',
      carrier: '',
      tracking_url: '',
      remarks: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOrder(order.id, formData);
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{order.material?.name}</h2>
            <p className="text-sm text-gray-500">
              {order.quantity} {UNITS_OF_MEASUREMENT[order.material?.unit_of_measurement || 'unit']}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Material Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Material Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Package2 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">{order.material?.name}</p>
                  <p className="text-sm text-gray-500">{order.material?.leumas_id}</p>
                  {order.material?.vendor_details && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Vendor: {order.material.vendor_details.name}</p>
                      <p>Contact: {order.material.vendor_details.contact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as MaterialOrder['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {Object.entries(ORDER_STATUSES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dispatch Date</label>
              <input
                type="date"
                value={formData.dispatch_date}
                onChange={(e) => setFormData({ ...formData, dispatch_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Arrival</label>
              <input
                type="date"
                value={formData.arrival_date}
                onChange={(e) => setFormData({ ...formData, arrival_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Shipping Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Waybill Number</label>
                <input
                  type="text"
                  value={formData.waybill_details.number}
                  onChange={(e) => setFormData({
                    ...formData,
                    waybill_details: {
                      ...formData.waybill_details,
                      number: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Carrier</label>
                <input
                  type="text"
                  value={formData.waybill_details.carrier}
                  onChange={(e) => setFormData({
                    ...formData,
                    waybill_details: {
                      ...formData.waybill_details,
                      carrier: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tracking URL</label>
                <input
                  type="url"
                  value={formData.waybill_details.tracking_url}
                  onChange={(e) => setFormData({
                    ...formData,
                    waybill_details: {
                      ...formData.waybill_details,
                      tracking_url: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  value={formData.waybill_details.remarks}
                  onChange={(e) => setFormData({
                    ...formData,
                    waybill_details: {
                      ...formData.waybill_details,
                      remarks: e.target.value
                    }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Order Timeline</h3>
            <div className="relative">
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200" />
              <div className="space-y-6 relative">
                <TimelineItem
                  title="Order Placed"
                  date={order.order_date}
                  status="completed"
                />
                <TimelineItem
                  title="Order Dispatched"
                  date={order.dispatch_date}
                  status={order.dispatch_date ? 'completed' : 'pending'}
                />
                <TimelineItem
                  title="Order Received"
                  date={order.arrival_date}
                  status={order.arrival_date ? 'completed' : 'pending'}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type TimelineItemProps = {
  title: string;
  date: string | null;
  status: 'completed' | 'pending';
};

function TimelineItem({ title, date, status }: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
        status === 'completed' 
          ? 'bg-green-100' 
          : 'bg-gray-100'
      }`}>
        <div className={`w-3 h-3 rounded-full ${
          status === 'completed'
            ? 'bg-green-500'
            : 'bg-gray-300'
        }`} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">
          {date ? formatDate(date) : 'Pending'}
        </p>
      </div>
    </div>
  );
}