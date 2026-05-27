package com.workorder.service;

import com.workorder.dto.WorkOrderRequest;
import com.workorder.model.WorkOrder;

import java.util.List;

public interface WorkOrderService {
    List<WorkOrder> findAll();
    WorkOrder findById(Long id);
    WorkOrder create(WorkOrderRequest request);
    WorkOrder update(Long id, WorkOrderRequest request);
    void delete(Long id);
}
