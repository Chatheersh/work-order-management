package com.fiix.workorder.repository;

import com.fiix.workorder.model.WorkOrder;
import com.fiix.workorder.model.WorkOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findByStatus(WorkOrderStatus status);

    List<WorkOrder> findByAssigneeIgnoreCase(String assignee);

    List<WorkOrder> findAllByOrderByCreatedAtDesc();
}
