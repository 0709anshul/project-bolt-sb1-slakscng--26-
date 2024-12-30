import React from 'react';
import { X, Truck, Calendar, Package2 } from 'lucide-react';
import { ORDER_STATUSES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { formatDate } from '../../../utils/date';
import type { MaterialOrder } from '../../../types/inventory';

type MaterialOrderDetailsModalProps = {
  order: MaterialOrder;
  isOpen: boolean;
  onClose: () => void;
};

export function MaterialOrderDetailsModal({ order, isOpen, onClose }: MaterialOrderDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
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

        <div className="space-y-6">
          {/* Status and Dates */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  STATUS_STYLES[order.status]
                }`}>
                  {ORDER_STATUSES[order.status]}
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Order Date</label>
              <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDate(order.order_date)}
              </p>
            </div>
          </div>

          {/* Material Details */}
          {order.material && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Details
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{order.material.name}</p>
                    <p className="text-sm text-gray-500">{order.material.leumas_id}</p>
                    {order.material.vendor_details && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Vendor: {order.material.vendor_details.name}</p>
                        <p>Contact: {order.material.vendor_details.contact}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Details */}
          {order.waybill_details && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Details
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Waybill:</span>{' '}
                      {order.waybill_details.number}
                    </p>
                    <p>
                      <span className="font-medium">Carrier:</span>{' '}
                      {order.waybill_details.carrier}
                    </p>
                    {order.waybill_details.tracking_url && (
                      <a
                        href={order.waybill_details.tracking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Track Shipment
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Timeline
            </label>
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
        </div>
      </div>
    </div>
  );
}

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  ordered: 'bg-blue-100 text-blue-800',
  dispatched: 'bg-purple-100 text-purple-800',
  received: 'bg-green-100 text-green-800'
};

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