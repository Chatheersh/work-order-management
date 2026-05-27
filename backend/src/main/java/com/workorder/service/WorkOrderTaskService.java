package com.workorder.service;

import com.workorder.dto.WorkOrderTaskRequest;
import com.workorder.model.WorkOrderTask;

import java.util.List;

public interface WorkOrderTaskService {
    List<WorkOrderTask> findAll();
    List<WorkOrderTask> findByWorkOrderId(Long workOrderId);
    WorkOrderTask findById(Long id);
    WorkOrderTask create(WorkOrderTaskRequest request);
    WorkOrderTask update(Long id, WorkOrderTaskRequest request);
    void delete(Long id);
}
